import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config()

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
	throw new Error('Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);