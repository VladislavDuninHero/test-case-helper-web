
export class Routes {
    static defaultApiUrl = import.meta.env.VITE_API_URL;

    static LOGIN_ROUTE = `${this.defaultApiUrl}/api/v1/user/login`;
    static MAIN_PAGE_ROUTE = `/projects`;
    static HOME_ROUTE = `/`;
    static ERROR_ROUTE = `/error`;
    static PROJECTS_ROUTE = `${this.defaultApiUrl}/api/v1/project`;
    static SUITE_ROUTE = `${this.defaultApiUrl}/api/v1/suite`;
    static ACTIVE_SESSION_RUN_SUITE_ROUTE = `${this.defaultApiUrl}/api/v1/suite/run/active`;
    static RUN_TEST_SUITE_SESSION_ROUTE = `${this.defaultApiUrl}/api/v1/suite/run`;
    static USER_ROUTE = `${this.defaultApiUrl}/api/v1/user`;
    static CREATE_PROJECT_ROUTE = `${this.defaultApiUrl}/api/v1/project/create`;
    static GET_ALL_TEST_SUITES_FOR_PROJECT_ROUTE = `${this.defaultApiUrl}/api/v1/project/{id}/suites`;
    static TEST_SUITE_ROUTE = `${this.defaultApiUrl}/api/v1/suite`;
    static CREATE_TEST_SUITE_ROUTE = `${this.defaultApiUrl}/api/v1/suite/create`;
    static CREATE_TEST_CASE_ROUTE = `${this.defaultApiUrl}/api/v1/case/create`;
    static TEST_CASE_ROUTE = `${this.defaultApiUrl}/api/v1/case`;
    static LOAD_EXCEL_BACKUP_ROUTE = `${this.defaultApiUrl}/api/v1/converters/excel`;
    static LOAD_WORD_REPORT_AFTER_RUN_TEST_SUITE_SESSION_ROUTE = `${this.defaultApiUrl}/api/v1/converters/suite`;
    static CREATE_TEAM_ROUTE = `${this.defaultApiUrl}/api/v1/team/create`;
    static GET_TEAM_ROUTE = `${this.defaultApiUrl}/api/v1/team`;
}