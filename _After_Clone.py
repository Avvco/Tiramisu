import re
import shutil

path = r"./Tiramisu_Laravel/laradock/.env.example"
file = open (path, "r+")
open('./Tiramisu_Laravel/laradock/.env', 'w').write(re.sub(r'PHP_VERSION=7.4', 'PHP_VERSION=8.1', file.read()))
file.close()

print("first one complete.\n")

src=r'./Tiramisu_Laravel/.env.example'
des=r'./Tiramisu_Laravel/.env'
shutil.copy(src, des)

path = r'./Tiramisu_Laravel/.env'
with open(path, 'r') as file:
    data = file.read()
    data = data.replace('DB_HOST=127.0.0.1'  , 'DB_HOST=mysql')
    data = data.replace('DB_DATABASE=laravel', 'DB_DATABASE=default')
    data = data.replace('DB_PASSWORD='       , 'DB_PASSWORD=root')
    data = data.replace('WORKSPACE_BROWSERSYNC_HOST_PORT=3000', 'WORKSPACE_BROWSERSYNC_HOST_PORT=64500')
    data = data.replace('WORKSPACE_BROWSERSYNC_UI_HOST_PORT=3001', 'WORKSPACE_BROWSERSYNC_UI_HOST_PORT=64501')

with open(path, 'w') as file:
    file.write(data)

print("all complete.\n")