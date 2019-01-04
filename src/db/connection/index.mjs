import mysql from 'mysql2/promise';
import { db } from '../../config';

export default mysql.createPool(db);
