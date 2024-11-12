import { model, Query, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { USER_ROLE } from './user.constant';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      default: 'user',
    },
    address: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// createdAt

// set password field "" when created user done
userSchema.post('save', function () {
  this.password = '';
});

// Pre middleware to filter out deleted users
userSchema.pre<Query<TUser[], TUser>>(/^find/, function (next) {
  // 'this' refers to the current query
  this.where({ isDeleted: false });
  next();
});

export const User = model<TUser>('User', userSchema);
