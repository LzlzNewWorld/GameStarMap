const redis = require('redis'),
RDS_PORT = 6379,                //端口号    
RDS_HOST = '111.231.14.53',    //服务器IP  要连接的A服务器redis    
RDS_OPTS = {
    password:'QWERDF595182653QWERDF595182653',
    db:15,//相当于select 
    prefix:'GAMESTARMAP_'//所有key的前缀
},//设置项
client =  redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
//redis的客户端会自动重新连接，所以不需要重新启动服务器
client.on("error", function(error) {
    console.log(error);
});
client.on("connect", function() {
    console.log('redis连接成功');
});

module.exports = client;