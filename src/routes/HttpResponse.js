class HttpResponse{
    constructor(data,options = { 'message': null, 'statusCode': 200, 'error': false } ){
        this.data = data;
        this.statusCode = options.statusCode || 200;
        if(options.error) {
            this.message = options.message;
            this.error = true;
        }
        else this.error = false;
    }
}

module.exports = {HttpResponse};