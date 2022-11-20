// import { isObject } from "../server/src/utils/async_handle";

class UserInfo {
    _id?: string;
    account: string;
    name: string;
    avatar: string;
    loginCode: number;
    email: string;
    phoneNumber: string;
    password: string;
    address: string;
    facebookId: string;
    userType: number;
    birth: number;
    gender: number;
    registerDate: number;
    status: number;
    userRole: number;
    token: string;
    lastLogin: number;
    /**
     * Thời gian làm
     */
    workShift: string;
    /**
     * Id phòng ban
     */
    // departmentId: string | undefined;
    // department: Department | null;

    /**
     * Mã máy chấm công
     */
    machineId: string;
    /**
     * Giới thiệu 
     */
    description: string;

    /**
     * Sở thích
     */
    hobby: string;

    /**
     * Quê quán
     */
    hometown: string;

    /**
     * trường đại học
     */
    university: string;

    discordId: string;
    clickupId: string;
    constructor(args?: any) {
        if (!args) {
            args = {};
        }
        this._id = args._id ?? undefined;
        this.account = args.account ?? "";
        this.name = args.name ?? "";
        this.avatar = args.avatar ?? "";
        this.loginCode = args.loginCode ?? -1;
        this.email = args.email ?? "";
        this.phoneNumber = args.phoneNumber ?? "";
        this.password = args.password ?? "";
        this.address = args.address ?? "";
        this.facebookId = args.facebookId ?? "";
        this.userType = args.userType ?? 0;
        this.birth = args.birth ?? 0;
        this.gender = args.gender ?? 0;
        this.registerDate = args.registerDate ?? 0;
        this.status = args.status ?? 1;
        this.userRole = args.userRole ?? 1;
        this.token = args.token ?? "";
        this.lastLogin = args.lastLogin ?? Date.now();
        this.workShift = args.workShift ?? "08:00";
        // this.departmentId = args.departmentId?._id ?? (args.departmentId ?? undefined);
        // this.department = new Department(args.departmentId);
        this.machineId = args.machineId;
        this.description = args.description ?? "";
        this.hobby = args.hobby ?? "";
        this.hometown = args.hometown ?? "";
        this.university = args.university ?? "";
        this.discordId = args.discordId ?? "";
        this.clickupId = args.clickupId ?? "";
        // if (isObject(args.departmentId)) {
        //     this.department = new Department(args.departmentId);
        // }
    }
}


export { UserInfo };

