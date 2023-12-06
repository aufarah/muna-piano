col_name = ['cpu', 'total_job', 'temp_add', 'version', 'timestamp', 'disk', 'timestamp2', 'server']
sql = f"INSERT INTO {','.join(col_name)}"
print(sql)