import re
import shutil

src=r'./Tiramisu_Laravel/.env.example'
des=r'./Tiramisu_Laravel/.env'
shutil.copy(src, des)

path = r'./Tiramisu_Laravel/.env'
with open(path, 'r') as file:
    data = file.read()
    data = data.replace('DB_HOST=127.0.0.1'  , 'DB_HOST=mysql')
    data = data.replace('DB_DATABASE=laravel', 'DB_DATABASE=default')
    data = data.replace('DB_PASSWORD='       , 'DB_PASSWORD=root')

with open(path, 'w') as file:
    file.write(data)

print("all complete.\n")