# Tárolt Eljárások Használati Útmutató

## 1. CREATE - Új rekord létrehozása

**Mit csinál:** Új sort hoz létre az adatbázisban és visszaadja az új rekord ID-ját.

**Példa:**
```sql
-- Új felhasználó létrehozása
SELECT sp_create_user(
    'johndoe',                    -- username
    'hashed_password_123',        -- password
    NULL,                         -- token
    'male',                       -- gender
    '+36301234567',               -- phone_number
    'john@example.com',           -- email
    'user'                        -- role
);
-- Visszaadja: 5 (az új user ID-ja)

-- Új termék létrehozása
SELECT sp_create_product(
    'Coca Cola 0.5L',            -- name
    299.99,                       -- price
    '/images/cola.jpg',           -- img
    'üdítő',                      -- type
    150,                          -- stock_count
    'italok',                     -- category
    1,                            -- contains_id
    'Szénsavas üdítőital'         -- description
);
-- Visszaadja: 22 (az új product ID-ja)
```

---

## 2. READ ALL - Összes rekord lekérése

**Mit csinál:** Visszaadja az összes rekordot a táblából (users esetén csak az aktívakat).

**Példa:**
```sql
-- Összes aktív felhasználó lekérése
SELECT * FROM sp_read_all_users();

-- Összes termék lekérése
SELECT * FROM sp_read_all_products();

-- Összes kosár lekérése
SELECT * FROM sp_read_all_carts();
```

**Eredmény:** Tábla formátumban visszaadja az összes sort az összes oszloppal.

---

## 3. READ BY ID - Egy rekord lekérése ID alapján

**Mit csinál:** Egy konkrét rekordot ad vissza az ID alapján.

**Példa:**
```sql
-- User lekérése ID alapján
SELECT * FROM sp_readById_users(5);

-- Termék lekérése ID alapján
SELECT * FROM sp_readById_products(22);

-- Kosár elem lekérése ID alapján
SELECT * FROM sp_readById_cart_items(10);
```

**Eredmény:** Ha létezik az ID, visszaadja azt az egy sort. Ha nem létezik, üres eredményt ad.

---

## 4. DELETE - Rekord törlése

**Mit csinál:** Törli a rekordot (users esetén csak inaktiválja).

### A) Users tábla (SOFT DELETE)
```sql
-- User "törlése" - csak is_active = false lesz
SELECT sp_delete_user(5);
-- Visszaadja: true (sikeres) vagy false (nem létezik az ID)

-- A user még mindig az adatbázisban van, csak is_active = false!
```

### B) Többi tábla (HARD DELETE)
```sql
-- Termék törlése (véglegesen törlődik)
SELECT sp_delete_product(22);

-- Kosár törlése
SELECT sp_delete_cart(3);

-- Kosár elem törlése
SELECT sp_delete_cart_item(10);
```

**Visszatérési érték:** 
- `true` = sikeres törlés
- `false` = nem létezik ilyen ID

---

## 5. UPDATE - Rekord módosítása (RÉSZLEGES)

**Mit csinál:** Csak azokat a mezőket módosítja, amelyeket megadsz paraméterként. A többi mező változatlan marad.

### Fontos: Ha egy paraméter NULL, akkor az a mező NEM módosul!

**Példa 1: Csak egy mező frissítése**
```sql
-- Csak az email-t frissítem, minden más változatlan marad
SELECT sp_update_user(
    5,                              -- user_id
    p_email := 'newemail@test.com'  -- csak ezt adom meg
);
-- A username, password, phone_number, stb. VÁLTOZATLAN marad!
```

**Példa 2: Több mező frissítése**
```sql
-- Email és telefonszám frissítése
SELECT sp_update_user(
    5,                              -- user_id
    p_email := 'newemail@test.com',
    p_phone_number := '+36309999999'
);
-- Csak ez a 2 mező változik, a többi marad!
```

**Példa 3: Termék ár és készlet frissítése**
```sql
-- Csak az árat és a készletet módosítom
SELECT sp_update_product(
    22,                    -- product_id
    p_price := 349.99,     -- új ár
    p_stock_count := 200   -- új készlet
);
-- A name, img, description, stb. változatlan!
```

**Példa 4: Kosár elem mennyiség frissítése**
```sql
-- Csak a mennyiséget állítom át
SELECT sp_update_cart_item(
    10,              -- cart_item_id
    p_quantity := 5  -- új mennyiség
);
```

**Visszatérési érték:**
- `true` = sikeres frissítés
- `false` = nem létezik ilyen ID

---

## Gyakori használati minták

### Új felhasználó regisztrálása
```sql
SELECT sp_create_user(
    'newuser',
    'hashed_password',
    NULL,
    'female',
    '+36301111111',
    'new@example.com',
    'user'
);
```

### Felhasználó bejelentkezés után token frissítés
```sql
SELECT sp_update_user(
    5,
    p_token := 'new_jwt_token_here',
    p_last_login := CURRENT_TIMESTAMP
);
```

### Termék készlet csökkentése vásárlás után
```sql
SELECT sp_update_product(
    22,
    p_stock_count := 145  -- 150-ről 145-re
);
```

### Felhasználó inaktiválása (törlés helyett)
```sql
SELECT sp_delete_user(5);
-- A user megmarad, de is_active = false lesz
```

### Kosárba tétel
```sql
-- 1. Kosár létrehozása (ha még nincs)
SELECT sp_create_cart(5);  -- user_id = 5, visszaadja: cart_id = 10

-- 2. Termék hozzáadása a kosárhoz
SELECT sp_create_cart_item(
    10,  -- cart_id
    22,  -- product_id
    3    -- quantity (darabszám)
);
```

### Kosár elem mennyiség módosítása
```sql
SELECT sp_update_cart_item(
    15,              -- cart_item_id
    p_quantity := 5  -- új darabszám
);
```

---

## Hibaelhárítás

### Ha false-t ad vissza UPDATE vagy DELETE
- Ellenőrizd, hogy létezik-e az adott ID az adatbázisban
```sql
-- Megnézni, hogy létezik-e
SELECT * FROM sp_readById_users(5);
```

### Ha NULL-ra akarsz állítani egy mezőt
- Sajnos a jelenlegi implementációval nem lehet, mert a COALESCE megtartja az eredeti értéket
- Megoldás: Külön eljárás kell erre, vagy használj direkt SQL UPDATE-et

### Egyedi megszorítások (UNIQUE)
- Ha username vagy phone_number már létezik, hibát fog dobni a CREATE vagy UPDATE
```sql
-- Ez hibát dob, ha 'johndoe' már létezik
SELECT sp_create_user('johndoe', 'pass', ...);
```
