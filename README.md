#### 1.爬虫

#### 2. puppeteer的使用

>
  相关api:
  ```
    const browser = await puppeteer.launch();//生成浏览器实例
    const page = await browser.newPage();//生成页面
    await page.goto(baseUrl);//进入到某一页面
    await browser.close();//关闭浏览器实例
  ```
>