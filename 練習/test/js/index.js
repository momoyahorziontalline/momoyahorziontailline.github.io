//DOM
var wrap=document.querySelector('.wrap');
function createChart(){
  for(let i=2;i<10;i++){
    //創建新 box
    const box=document.createElement('div');
    box.setAttribute('class','box')
    //將 box加入wrap
    wrap.appendChild(box);
    
    //創建新 chart
    const chart=document.createElement('ul');
    chart.setAttribute('class','chart');
    
    //將 chart加入box
    box.appendChild(chart);
    
    //創建標題
    let title=document.createElement('li');
    title.textContent=i;
    title.setAttribute('class','chart_title');
    //將標題加入 chart
    chart.appendChild(title);
    
    
    for(let j=1;j<10;j++){
       let answer=i*j;
       //NEW LIST
       let list=document.createElement('li');
       list.textContent=`${i} × ${j} =${answer}`
  
       //將 list加入chart
       chart.appendChild(list);
    }
  };
};
createChart();