export default class KSInternalConfig {
    static STATUS_DELETED = -1;
    static STATUS_PRIVATE = 0;
    static STATUS_PUBLIC = 1;
    static STATUS_TESTING = 2;
    static STATUS_WAITING = 3;
    static STATUS_APPROVED = 4;
    static STATUS_REJECTED = 5;

    static USER_TYPE_FULL_TIME = 0;
    static USER_TYPE_PART_TIME = 1;
    static USER_TYPE_PROBATION_FULL = 2; // thử việc toàn thời gian 
    static USER_TYPE_PROBATION_PART = 3; // thử việc part time
    static USER_TYPE_INTERN = 4;

    static WORK_STATUS_QUITED = -1; // DA NGHI VIEC
    static WORK_STATUS_ACTIVE = 1; // DANG LAM VIEC
    static WORK_STATUS_WFH = 2;
    static WORK_STATUS_WAITING = 3;

    static TIME_KEPPING_LATE = -1; // DEN MUON
    static TIME_KEPPING_PROGRESS = 0;
    static TIME_KEPPING_OK = 1; // OK
    static TIME_KEPPING_FORGET = 2; // QUEN CHAM CONG
    static TIME_KEPPING_REST = 3; // NGHI
    static TIME_KEEPING_NOT_ENOUGHT = 4; // KHONG DU THOI GIAN YEU CAU
    static TIME_KEEPING_NOT_PASS = 5; // KHONG DAT YEU CAU: DI MUON + KHONG DU THOI GIAN

    static LOGIN_FAILED = -1;
    static LOGIN_SUCCESS = 0;
    static LOGIN_ACCOUNT_IS_USED = 1;
    static LOGIN_ACCOUNT_NOT_EXIST = 2;
    static LOGIN_WRONG_PASSWORD = 3;
    static LOGIN_WRONG_PROVIDER = 4;
    static LOGIN_ACCOUNT_NOT_ACTIVATED = 5;
    static LOGIN_MOBILE_IS_USED = 6;
    static LOGIN_USER_NOT_GRANTED_PERMISSION = 7;
    static LOGIN_TOKEN_INVALID = 8;
    static LOGIN_WAIT_FOR_EMAIL_VERIFICATION = 9;

    static ADMIN = 0;
    static STAFF = 1;

    static WORK_SHIFT_ONE = "08:00";
    static WORK_SHIFT_TWO = "08:30";

    static WORKING_NUMBER_NONE = 0;
    static WORKING_NUMBER_PART = 1 / 2;
    static WORKING_NUMBER_FULL = 1;

    static WORKING_ON_MORNING = 0;
    static WORKING_ON_AFTERNOON = 1;

    static WORKING_TIME_PART = "03:30";
    static WORKING_TIME_FULL = "06:00";
    static WORKING_TIME_FOR_LUNCH = "01:29";

    static UPLOAD_FILE_EXCEL_SUCCESS = "Upload thành công file chấm công";
    static COLS_FILE_EXCEL_FAIL = "Upload file thất bại, yêu cầu cột trong file Excel lần lượt là: STT, Ngày, ID, Họ và Tên, Giờ Vào, Giờ Ra";
    static LIMIT = 20;

    static FORM_TYPE_REST = 0; // đơn xin nghỉ 
    static FORM_TYPE_LATE = 1; // đơn xin đi muộn 

    static WORK_TYPE_OFFLINE = 0; // Làm offline 
    static WORK_TYPE_ONLINE = 1; // Làm online

    static ProjectRoles = Object.freeze({
        OWNER: 0,
        SPRINT_MASTER: 1,
        SPRINT_MEMBER: 2
    })

    static SprintStatus = Object.freeze({
        ARCHIVED: -1,
        ACTIVE: 0,
        UP_COMING: 1
    });

    static TaskRoles = Object.freeze({
        ASSIGNEE: 0,
        REVIEWER: 1,
        TESTER: 2
    });

    static TaskStatus = Object.freeze({
        OPEN: 0,
        IN_PROGRESS: 1,
        REVIEW: 2,
        BUG: 3,
        CLOSED: 4
    });

    static TaskStatusStage = Object.freeze({
        REVIEW_DEFAULT: 0,
        REVIEW_TESTING: 1,
        REVIEW_PROD_VALIDATION: 2
    });

    static TaskDifficulty = Object.freeze({
        NORMAL: 0,
        MEDIUM: 1,
        HARD: 2
    });

    static TaskPriority = Object.freeze({
        LOW: 0,
        MEDIUM: 1,
        HIGH: 2
    });
}