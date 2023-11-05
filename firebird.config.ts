export const nodeFirebirdOptions = {
  host: "127.0.0.1",
  port: 3050,
  database: "/opt/atp-online_db/atp.fdb",
  user: "SYSDBA",
  password: "masterkey",
  lowercase_keys: false,
  role: null,
  pageSize: 4096,
  retryConnectionInterval: 1000,
  blobAsText: false,
};

export const connectionStringForODBC =
  "DSN=firebird;UID=SYSDBA;PWD=masterkey;CHARSET=UNICODE_FSS";
