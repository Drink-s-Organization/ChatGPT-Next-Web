echo "building docker image next-chat:$1, login aliyun registry"

read -p "Enter your name: " username

cat .aliyun_pass | docker login --username="$username"@yoooxin registry.cn-beijing.aliyuncs.com -u "$username"@yoooxin --password-stdin

docker build --platform linux/amd64 -t next-chat:$1 .

version=$1
echo $version
docker images | grep 'next-chat' | grep $version | awk '{print $3}' | while read image_id
do
    echo $image_id
    docker tag $image_id registry.cn-beijing.aliyuncs.com/yoooxin/next-chat:$1
    docker push registry.cn-beijing.aliyuncs.com/yoooxin/next-chat:$1
    break
done