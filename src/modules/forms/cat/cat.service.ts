import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CatDocument } from './cat.schema';
import { Model } from 'mongoose';
import { Cat, CatInput } from './cat.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async create(createCatDto: CatInput): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async update(id: string, updateCatDto: CatInput): Promise<Cat> {
    return this.catModel.findByIdAndUpdate(id, updateCatDto);
  }

  async delete(id: string): Promise<Cat> {
    return this.catModel.findByIdAndDelete(id);
  }

  async findCat(id: string) {
    return this.catModel
      .findOne({
        _id: id,
      })
      .exec();
  }

  async addFilename(
    _id: string | mongoose.Schema.Types.ObjectId | CatDocument,
    filename: string,
  ): Promise<Cat> {
    return this.catModel.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        $push: {
          filenames: filename,
        },
      },
    );
  }

  async removeFilename(
    _id: string | mongoose.Schema.Types.ObjectId | CatDocument,
    filename: string,
  ): Promise<Cat> {
    return this.catModel.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        $pull: {
          filenames: filename,
        },
      },
      {
        multi: true,
      },
    );
  }
}
