import axios from "axios"
import * as cheerio from 'cheerio';
import * as XLSX from "xlsx";
import fs from "fs"

let url="https://www.shine.com/job-search/software-developer-fresher-jobs?q=software-developer-fresher&inference=%257B%2522skill%2522%253A%255B%255D%252C%2522jt%2522%253A%255B%2522software%2520developer%2522%255D%252C%2522ind%2522%253A%255B%2522fresher%2522%255D%252C%2522root_ind%2522%253A%255B%2522fresher%2520%2522%255D%257D";


async function getData(url){
try{
    let response=await axios.get(url);
fs.writeFileSync("Data.txt",response.data);
}
catch(err){
console.log("error occured",err);
}
}

getData(url);


let html=fs.readFileSync("data.txt","utf-8");
//  console.log(html);
 let $=cheerio.load(html);

 let JobTitle=[];
 let  Company=[];
 let Location=[];
 let JobType=[];
 let JobPosted=[];
 
$(".jobCard_jobCard_features__wJid6>span").each((index,element)=>{
    JobPosted.push($(element).text());
//  console.log($(element).text());
});

$(".jobCard_jobType__eAJxE").each((index,element)=>{
     JobType.push($(element).text());
    // console.log($(element).text());
});

$(".jobCard_pReplaceH2__xWmHg>p>a").each((index,element)=>{
    JobTitle.push($(element).text());
    // console.log($(element).text());
});

$(".jobCard_jobCard_lists_item_YxRkV.jobCard_locationIcon_zrWt2").each((index,element)=>{
    Location.push($(element).text());
//    console.log($(element).text());
});

$(".jobCard_jobCard_cName__mYnow>span").each((index,element)=>{
   Company.push($(element).text());
//    console.log($(element).text());
});

let exceldata=[];
exceldata.push(['Job Title', 'Company', 'Location','Job Type','Posted Date'])
for(let i=0;i<JobTitle.length;i++){
    let innerdata=[JobTitle[i],Company[i], Location[i],JobType[i],JobPosted[i]];
    exceldata.push(innerdata);
}

console.log(exceldata);

const workbook = XLSX.utils.book_new();
const sheet = XLSX.utils.aoa_to_sheet(exceldata);
XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
XLSX.writeFile(workbook, 'output.xlsx');