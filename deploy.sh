export VERSION=$1
#export BASE_URL=http://api.easychat.vip/chatapi
export BASE_URL=http://39.106.226.212:8888/chatapi

read -p "Enter your name: " username

cat .aliyun_pass | docker login --username="$username"@yoooxin registry.cn-beijing.aliyuncs.com -u "$username"@yoooxin --password-stdin

docker compose up -d