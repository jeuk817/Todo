# Todo
1. node.js 설치
sudo apt-get install curl   
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -    
sudo apt-get install -y nodejs    
sudo apt-get install git-core  
sudo apt-get install npm  

2. mysql 설치
sudo apt-get install mysql-server    
mysql -uroot -p  
CREATE DATABASE task;  
USE task;  
CREATE USER 'todouser'@'%' IDENTIFIED BY '1234';   
GRANT ALL PRIVILEGES ON task.* TO 'todouser'@'%';   
FLUSH PRIVILEGES;  
CREATE TABLE todo (  
  `id` int(11) NOT NULL AUTO_INCREMENT,  
  `title` varchar(20) character set utf8 NOT NULL,  
  `description` varchar(200) character set utf8 DEFAULT NULL,  
  `date` varchar(10) character set utf8 DEFAULT NULL,  
  `star` varchar(3) character set utf8 NOT NULL,  
  PRIMARY KEY (`id`)  
);  
CREATE TABLE done (  
  `id` int(11) NOT NULL,  
  `title` varchar(20) character set utf8 NOT NULL,  
  `description` varchar(200) character set utf8 DEFAULT NULL,  
  `date` varchar(10) character set utf8 DEFAULT NULL,  
  `star` varchar(3) character set utf8 NOT NULL,  
  PRIMARY KEY (`id`)  
);  



3. 파일 다운로드
git clone https://github.com/jeuk817/Todo.git    

3. 웹서버 환경 구성
npm init    
npm install    
node index.js  
sudo npm install pm2 -g  
