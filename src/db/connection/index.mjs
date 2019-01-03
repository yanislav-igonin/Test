import mysql from 'mysql2/promise';
import { db } from '../../config';

const createDbConnection = () => mysql.createConnection({ ...db });

export default createDbConnection;
