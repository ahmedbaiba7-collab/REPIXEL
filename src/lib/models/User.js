import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 16,
    },
    // نخزّن الإيميل بأحرف صغيرة لمنع التكرار
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // لا نخزّن كلمة المرور أبداً — فقط الهاش
    passwordHash: {
      type: String,
      required: true,
    },
    coins: {
      type: Number,
      default: 0,
      min: 0,
    },
    rank: {
      type: String,
      default: 'عضو',
    },
    // سجل المشتريات
    purchases: [
      {
        itemId: String,
        itemName: String,
        price: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// نمنع إرجاع الهاش عند تحويل المستند إلى JSON
UserSchema.methods.toSafeJSON = function () {
  return {
    id: this._id.toString(),
    username: this.username,
    email: this.email,
    coins: this.coins,
    rank: this.rank,
    purchases: this.purchases,
    createdAt: this.createdAt,
  };
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
