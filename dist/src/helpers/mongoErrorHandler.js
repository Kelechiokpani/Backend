class MongooseErrorUtils {
    static handleDuplicateKeyError(error) {
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];
        const errorMessage = `Duplicate value detected: The value '${value}' already exists for field '${field}'.`;
        return errorMessage;
    }
    static handleValidationError(error) {
        const errors = Object.values(error.errors).map((e) => e.message);
        const errorMessage = `Validation Error: ${errors.join(", ")}`;
        return errorMessage;
    }
    static handleMongooseError(error) {
        let errorMessage;
        console.log('Error from mongo', error);
        switch (error.code) {
            case 11000:
                errorMessage = MongooseErrorUtils.handleDuplicateKeyError(error);
                break;
            default:
                if (error.name === "ValidationError") {
                    errorMessage = MongooseErrorUtils.handleValidationError(error);
                }
                else {
                    errorMessage =
                        "An unknown error occurred while processing the request.";
                }
        }
        return errorMessage;
    }
}
export default MongooseErrorUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29FcnJvckhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9tb25nb0Vycm9ySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLGtCQUFrQjtJQUNwQixNQUFNLENBQUMsdUJBQXVCLENBQUMsS0FBVTtRQUNyQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sWUFBWSxHQUFHLHdDQUF3QyxLQUFLLCtCQUErQixLQUFLLElBQUksQ0FBQztRQUMzRyxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQW9DO1FBQzdELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sWUFBWSxHQUFHLHFCQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDOUQsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFpQztRQUN4RCxJQUFJLFlBQW9CLENBQUM7UUFFekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN0QyxRQUFTLEtBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMxQixLQUFLLEtBQUs7Z0JBQ04sWUFBWSxHQUFHLGtCQUFrQixDQUFDLHVCQUF1QixDQUNyRCxLQUFtQixDQUN0QixDQUFDO2dCQUNGLE1BQU07WUFDVjtnQkFDSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssaUJBQWlCLEVBQUUsQ0FBQztvQkFDbkMsWUFBWSxHQUFHLGtCQUFrQixDQUFDLHFCQUFxQixDQUNuRCxLQUFzQyxDQUN6QyxDQUFDO2dCQUNOLENBQUM7cUJBQU0sQ0FBQztvQkFDSixZQUFZO3dCQUNSLHlEQUF5RCxDQUFDO2dCQUNsRSxDQUFDO1FBQ1QsQ0FBQztRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7Q0FDSjtBQUVELGVBQWUsa0JBQWtCLENBQUMifQ==