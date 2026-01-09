
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.1';

const supabaseUrl = 'https://ctsrjxhzolikvkrzfdpp.supabase.co';
const supabaseKey = 'sb_publishable_33K56t9UChx6ysbkUZ_bpg_P0MFNx7T';

export const supabase = createClient(supabaseUrl, supabaseKey);
