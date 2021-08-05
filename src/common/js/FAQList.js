const staff={
    'zh-CN':{
        title:'成员',
        content:'陈晓敏 王汉隆 陆广耀 林靖斌 洪泽林 韩泽楷'
    },
    'en-US':{
        title:'staff',
        content:'陈晓敏 王汉隆 陆广耀 林靖斌 洪泽林 韩泽楷'
    }
}
const github={
    'zh-CN':{
        title:'github',
        content:`<a href='https://github.com/luguangyao/asi'>https://github.com/luguangyao/asi</a>`
    },
    'en-US':{
        title:'github',
        content:`<a href='https://github.com/luguangyao/asi'>https://github.com/luguangyao/asi</a>`
    }
}
const divisionOfWork={
    'zh-CN':{
        title:'分工',
        content:
        `<table border='1'>
        <tr>
         <th>项目开发组</th><th>负责人</th><th>主要成员</th><th>具体内容</th>
       </tr>
       <tr>
         <td>项目需求分析与架构设计</td><td>陈晓敏</td><td>王汉隆 陆广耀 林靖斌 洪泽林 韩泽楷</td><td>需求分析 项目开发框架设计 项目开发过程确定</td>
       </tr>
       <tr>
         <td>前端开发</td><td>陆广耀</td><td>王汉隆</td><td></td>
       </tr>
       <tr>
         <td>后端开发</td><td>陈晓敏</td><td>林靖斌 韩泽楷 洪泽林</td><td>纵向划分为4个模块</td>
       </tr>
       <tr>
         <td>项目运维</td><td>林靖斌</td><td>王汉隆</td><td>1.通过MyCat实现数据库的热备份、分表分库、读写分离功能2.Redis的部署3.Nginx的配置4.项目最终的整合及部署</td>
       </tr>
       <tr>
         <td>测试开发</td><td>韩泽楷</td><td>王汉隆 林靖斌</td><td>1.基准测试2.并发测试3.综合场景测试4.压力，负载测试5.系统，验收测试</td>
       </tr>
     </table>`
    },
    'en-US':{
        title:'division of work',
        content:
        `<table border='1' >
        <tr>
         <th>project group</th><th>leader</th><th>main member</th><th>details</th>
       </tr>
       <tr>
         <td>Project requirements analysis and architecture design</td><td>陈晓敏</td><td>王汉隆 陆广耀 林靖斌 洪泽林 韩泽楷</td><td>Requirements analysis, project development, framework design, project development process determination</td>
       </tr>
       <tr>
         <td>Front end development</td><td>陆广耀</td><td>王汉隆</td><td></td>
       </tr>
       <tr>
         <td>Back end development</td><td>陈晓敏</td><td>林靖斌 韩泽楷 洪泽林</td><td>It is vertically divided into 4 modules</td>
       </tr>
       <tr>
         <td>Project operation and maintenance</td><td>林靖斌</td><td>王汉隆</td><td>1. Realize the functions of database hot backup, table and database separation and read-write separation through MYCAT 2. Redis deployment 3. Nginx configuration 4. Final integration and deployment of the project</td>
       </tr>
       <tr>
         <td>Test Development</td><td>韩泽楷</td><td>王汉隆 林靖斌</td><td>1. Benchmark test 2. Concurrent test 3. Comprehensive scenario test 4. Stress and load test 5. System and acceptance test</td>
       </tr>
     </table>`
    }
}
export default{
    faq:{
        staff,github,divisionOfWork
    },
    getFAQ(language,item){
       return item[language]
    }
}


