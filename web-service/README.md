## Instalasi dan Inisiasi PostGIS via Docker
```sh
docker run --name expressjs-postgis -e POSTGRES_PASSWORD=uinsgd -p 5432:5432 postgis/postgis
```

## Pendefinisian Data

### Pembuatan Schema
```sql
CREATE SCHEMA jabar;
```

### Pembuatan Tabel dan Index
```sql
CREATE TABLE jabar.pariwisata (
	id_tempat serial4 NOT NULL,
	nama_tempat varchar NULL,
	kategori int4 NULL,
	koordinat public.geometry(point, 4326) NULL,
	lahan public.geometry(polygon, 4326) NULL,
	jalur public.geometry(linestring, 4326) NULL,
	CONSTRAINT pariwisata_pkey PRIMARY KEY (id_tempat)
);
CREATE INDEX jabar_pariwisata_jalur_idx ON jabar.pariwisata USING gist (jalur);
CREATE INDEX jabar_pariwisata_koordinat_idx ON jabar.pariwisata USING gist (koordinat);
CREATE INDEX jabar_pariwisata_lahan_idx ON jabar.pariwisata USING gist (lahan);
```

