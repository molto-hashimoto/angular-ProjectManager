export interface Attendance {
    date: string;
    dayOfWeek: string;
    start: string;
    end: string;
    rest: string;
    work: string;
    note: string;
}

export interface Monthly {
    year: number;
    month: number;
    totalDays: number;
    totalTime: string;
}
