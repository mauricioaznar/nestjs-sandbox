import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthenticationError } from 'apollo-server-core';
import { AccessToken, LoginInput, User, UserInput } from './auth.dto';
import { Injectable, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { ForbiddenError } from 'apollo-server-express';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { JwtService } from '@nestjs/jwt';
import { MemoryTokenService } from '../common/services/memory-token/memory-token.service';
import { FilesService } from '../files/files.service';

@Resolver(() => User)
@Injectable()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private memoryTokenService: MemoryTokenService,
    private filesService: FilesService,
  ) {}

  @Mutation(() => AccessToken)
  async login(@Args('loginInput') input: LoginInput) {
    const result = await this.authService.login(input);
    if (result) return result;
    throw new AuthenticationError(
      'Could not log-in with the provided credentials',
    );
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() currentUser: User) {
    return this.authService.findOneByUsername({
      username: currentUser.username,
    });
  }

  @Query(() => String, { nullable: true })
  async getServerVersion(@CurrentUser() currentUser: User) {
    return process.env.npm_package_version;
  }

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async isUserOccupied(@Args('username') username: string) {
    const user = await this.authService.findOneByUsername({
      username,
    });
    return !!user;
  }

  // todo delete file if exists
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @Args('userId') userId: string,
    @CurrentUser() currentUser: User,
  ) {
    const { filename, mimetype, encoding, createReadStream } = file;
    // console.log('attachment:', filename, mimetype, encoding);

    if (userId.toString() !== currentUser._id && !currentUser.admin) {
      return new ForbiddenError('Not allowed');
    }

    const user = await this.authService.findOneByUser({ user: userId });

    const oldAvatar = user.avatar;
    if (oldAvatar) {
      await this.filesService.deleteFileIfExists(oldAvatar);
    }

    const newFileName = `${userId}-${filename}`;

    await this.authService.updateAvatar(userId, newFileName);
    return this.filesService.createFile(createReadStream, newFileName);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async createUser(
    @Args('userInput') input: UserInput,
    @CurrentUser() currentUser: User,
  ) {
    if (!currentUser.admin) {
      return new ForbiddenError('Not allowed');
    }
    return this.authService.create(input);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('_id') id: string,
    @Args('userInput') input: UserInput,
    @CurrentUser() currentUser: User,
  ) {
    const oldUser = await this.authService.findOneByUser({ user: id });
    if (oldUser._id.toString() !== currentUser._id && !currentUser.admin) {
      return new ForbiddenError('Not allowed');
    }
    return this.authService.update(id, {
      ...input,
      admin: currentUser.admin ? input.admin : false,
    });
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async users(@CurrentUser() currentUser: User) {
    return this.authService.findAll();
  }

  @ResolveField('avatar', () => String)
  async avatar(
    @Parent() user: User,
    @CurrentUser() currentUser,
    @Context() ctx,
  ): Promise<string> {
    const token = await this.memoryTokenService.getToken(currentUser._id);

    if (!user.avatar || user.avatar === '') {
      return null;
    }

    const baseUrl = this.filesService.getFileBaseEndpointUrl(ctx);

    return `${baseUrl}/${token}/${user.avatar}`;
  }
}
