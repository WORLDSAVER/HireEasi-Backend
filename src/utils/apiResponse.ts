class ApiResponse {
    private status: number;
    private data: any;
    private message: string;

    constructor(status: number, data: any, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;

    }

}

export default ApiResponse;