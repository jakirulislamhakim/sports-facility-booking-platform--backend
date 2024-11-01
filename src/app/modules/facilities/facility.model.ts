import { model, Schema } from 'mongoose';
import { TFacility } from './facility.interface';

const facultySchema = new Schema<TFacility>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    pricePerHour: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
  },
  { timestamps: true },
);

export const Facility = model<TFacility>('Facility', facultySchema);
