CREATE TABLE jabar.pariwisata (
	id_tempat serial4 NOT NULL,
	nama_tempat varchar NULL,
	kategori int4 NULL,
	koordinat public.geometry(point, 4326) NULL,
	lahan public.geometry(polygon, 4326) NULL,
	CONSTRAINT pariwisata_pkey PRIMARY KEY (id_tempat)
);
