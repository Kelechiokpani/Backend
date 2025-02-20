import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const options = {
    // keepAlive: true,
    serverSelectionTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
class db {
    constructor(log) {
        this.log = log;
    }
    connect(DB_URL) {
        const log = this.log;
        mongoose.set("strictQuery", false);
        const connectWithRetry = () => {
            log.info('Attempting MongoDB connection (will retry if needed)');
            mongoose
                .connect(DB_URL, options)
                .then(async () => {
                log.info(`Successfully connected to `, DB_URL);
            })
                .catch((err) => {
                log.error(`There was a db connection error: `, err);
                setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
            });
        };
        connectWithRetry();
        mongoose.connection.on("disconnected", () => {
            log.error(`Successfully disconnected from ${DB_URL}`);
        });
        process.on("SIGINT", () => {
            mongoose.connection.close().then(() => {
                log.error("dBase connection closed due to app termination");
            });
        });
    }
}
export default db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxPQUFPLEdBQUc7SUFDWixtQkFBbUI7SUFDbkIsd0JBQXdCLEVBQUUsS0FBSztJQUMvQixlQUFlLEVBQUUsSUFBSTtJQUNyQixrQkFBa0IsRUFBRSxJQUFJO0NBQzNCLENBQUM7QUFFRixNQUFNLEVBQUU7SUFHSixZQUFZLEdBQVE7UUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFjO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFbkMsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLEVBQUU7WUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1lBQ2pFLFFBQVE7aUJBQ0gsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7aUJBQ3hCLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDYixHQUFHLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDaEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDcEQsVUFBVSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsbUNBQW1DO1lBQzNFLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDO1FBR0YsZ0JBQWdCLEVBQUUsQ0FBQztRQUVuQixRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO1lBQ3hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0NBQWtDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDdEIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNsQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQUVELGVBQWUsRUFBRSxDQUFDIn0=