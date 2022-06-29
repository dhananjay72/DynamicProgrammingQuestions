import requests
from bs4 import BeautifulSoup
import re
import csv

url = "https://chuka231.blogspot.com/2021/01/leetcode-all-dynamic-programming.html"

r = requests.get(url) ;
print(r.status_code)

soup = BeautifulSoup(r.text ,'html.parser')

Table = soup.find('table' , class_ ='MsoNormalTable')

url = []
name = []
difficulty = []
category = []
subCategory = []

for tt in Table.find_all('td') :
    # print(tt.text.strip())
    temp = tt.find_all('a') ;
    # print(temp)
    for link in temp :
        url.append(link.get('href'))


for tt in Table.find_all('tr') :
    title = tt.find_all('td')[1].text.strip()
    name.append(title)
    title = tt.find_all('td')[2].text.strip()
    difficulty.append(title)
    title = tt.find_all('td')[3].text.strip()
    category.append(title)
    title = tt.find_all('td')[4].text.strip()
    subCategory.append(title)   


 

last = []
sze = len(url)
for i in range(0 , sze):
  temp = name[i] 
  temp = temp.replace('\r\n' , '')
  temp = temp.replace('\n' , '')
  temp = temp.replace('  ' , ' ')
  name[i] = temp ;
  temp = category[i] 
  temp = temp.replace('\r\n' , '')
  temp = temp.replace('\n' , '')
  temp = temp.replace('  ' , ' ')
  category[i] = temp;


    
url.insert(0 , "URL") 
print(len(url))
print(len(category))
 
 
for i in range(0 , sze):
    last.append([ name[i] , url[i] , difficulty[i] , category[i] , subCategory[i]  ])


fields = ['name' ,'URL' , 'difficulty' , 'category' , 'sub']

with open('GFG', 'w') as f:
      
    # using csv.writer method from CSV package
    write = csv.writer(f)
      
    write.writerow(fields)
    write.writerows(last)
