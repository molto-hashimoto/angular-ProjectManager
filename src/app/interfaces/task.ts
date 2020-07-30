export interface Task {
    no: number;
    project_no: number;
    name: string;
    status: string;
    operator: string;
    start: Date;
    end: Date;
    place: string;
    note: string;
}
