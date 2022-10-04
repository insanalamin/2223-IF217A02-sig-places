# Places 

## Solusi
Aplikasi yang mampu merekam dan menampilkan data berbagai tempat

## Use Case
Use Case | Prioritas 
--- | ---
User mampu menambah data tempat | 5 
Public mampu melihat sebaran tempat yang dibedakan berdasarkan kategori | 5 
User mampu melihat seluruh data tempat yang telah diinput | 3 
User mampu menghapus data tempat | 3 

## Struktur data

Atribut | Tipe Data 
--- | ---
ID | varchar(36) 
Nama | varchar(80) 
Kategori | varchar(36) 
Alamat | varchar(240) 
Koordinat | geom

## Views

1. Public Map View : Tampilan peta buat publik
2. Admin
  1. Input data
  2. List data : View , Delete 

## Web Service
1. GET /places?type=geojson : Melihat seluruh tempat dalam format GeoJSON
2. GET /places : Melihat seluruh tempat
3. POST /places : Menambah tempat baru
4. GET /places/{places_id} : Melihat tempat berdasarkan ID
5. DELETE /places/{places_id} : Menghapus tempat berdasarkan ID
