// [1]
const MongoClient = require('mongodb').MongoClient;

// [2]
// password 부분에는 Database Access때 생성된 비밀번호 코드를 넣는다. 
// 뒤에 products_test로 데이터베이스의 이름을 설정해준다.
const url = 'mongodb+srv://new-user-01:U9frWWQHqNGCK7gA@cluster0.n8xt0zq.mongodb.net/user_test?retryWrites=true&w=majority';

// [3]
// 비동기
const createUser = async (req, res, next) => {
    // [3-1]. 데이터베이스 내에 생성 및 저장하고자 하는 객체추가
    const newUser = {
        name : req.body.name,
        age: req.body.age
    };
    // [3-2]. mongoDB 데이터베이스에 넣기위한 코드.
    // mongoClient에 연결할 서버에 대한 정보를 알려준다.
    const client = new MongoClient(url);

    // [3-3]. 실제 실행되는 코드
    try{
        // new MongoClient(url), 즉 mongoDB 서버 연결
        // 연결하는데 시간이 걸리기 때문에 비동기
        await client.connect();
        const db = client.db();
        // 새로운 데이터를 생성해 데이터베이스에 추가(1번 newProduct 가져옴)
        // collection() 메소드는 컬렉션의 이름을 인수로 사용가능
        // insertOne() 메소드는 한개의 신규 document를 추가할때 씀
        const result = db.collection('users').insertOne(newUser); 
    }
    catch(error) {
        return res.json({message: 'check again your data'})
    }
    // [3 - 4]
    // 계속 여러 연결이 열려 있는 상태는 효율적이지 못하고 데이터베이스와 이런 방식으로 소통하는것은 올바르지 못하다.
    // 그래서 한개의 신규 document를 추가하면 close()메소드로 연결을 종료해준다.
    // client.close();
    // 응답
    res.json(newUser);
};

// [4]
const getUser = async (req, res, next) => {
    const client = new MongoClient(url);

    let users;

    try{
        // 서버 연결
        await client.connect();
        const db = client.db();
        // collection을 검색해서 가져오는데 시간이 걸릴수도 있으니까 비동기
        // find() 메소드는 특정 데이터를 검색하는 메소드
        // toArray() 메소드는 배열형태로 문서를 가져오게 한다.
        users = await db.collection('users').find().toArray();
    }
    catch{

    }
    client.close();
    res.json(users);
};

// [3][4]
exports.createUser = createUser;
exports.getUser = getUser;