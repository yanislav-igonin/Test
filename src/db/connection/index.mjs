import mysql from 'mysql2/promise';
import { db } from '../../config';

const pool = mysql.createPool(db);

export default pool;
