import config from '../config';
import { bcryptHashPassword } from '../modules/auth/auth.utils';
import { User } from '../modules/user/user.model';

const firstAdminData = {
  name: 'Jakirul Islam Hakim',
  email: config.FIRST_ADMIN_EMAIL,
  phone: '01736100945',
  role: 'admin',
  address: 'Dhaka , Bangladesh',
};

const pushFIrstAdminIntoDB = async () => {
  const user = await User.findOne({
    email: config.FIRST_ADMIN_EMAIL,
    role: 'admin',
  });

  if (!user) {
    const password = await bcryptHashPassword(
      config.FIRST_ADMIN_PASSWORD as string,
    );

    await User.create({ ...firstAdminData, password });
  }
};

export default pushFIrstAdminIntoDB;
