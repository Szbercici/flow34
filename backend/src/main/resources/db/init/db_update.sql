--theme CREATE ENUM
CREATE TYPE theme_type AS ENUM ('light', 'dark');

--users táblába a theme
-- Alapértelmezett: 'light'
ALTER TABLE users 
ADD COLUMN theme theme_type DEFAULT 'light' NOT NULL;

-- Töröljük a type oszlopot a products táblából
ALTER TABLE products 
DROP COLUMN IF EXISTS type;

DO $$ BEGIN
    RAISE NOTICE '✓ theme tábla letrehozva, users tablaba';
    RAISE NOTICE '✓ products táblából type oszlop törölve';
END $$;


