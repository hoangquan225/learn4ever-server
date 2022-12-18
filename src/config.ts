import { decrypt, encodeSHA256Pass } from './submodule/utils/crypto';
import dotenv from './utils/dotenv';

dotenv.config();
export default class ServerConfig {
    static SECRET_KEY = "ks_secret_key";
    static SUPER_ACCOUNT = "6aajSgy3Dg9,Rx(_Az$a";
    static SUPER_PASSWORD = "d761d7a04a597d6b80bf0c8674b176c5a31d969af9ad80aac5dda22d58f4ce8a";
    static SUPPORT_EMAIL_KEY = process.env.SUPPORT_EMAIL_KEY || "7e45807e705feb6fd67dddd1ab9138d6";
    static SUPPORT_EMAIL_PUBLIC_KEY = process.env.SUPPORT_EMAIL_PUBLIC_KEY || "2a03785eb5b6061a49993b21c4728ddf";
    static SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "chinh.vothithuy@gmail.com";
    static PASSWORD_CONFIRM = encodeSHA256Pass('admin', process.env.PASSWORD_CONFIRM || "koolsoft");
}

