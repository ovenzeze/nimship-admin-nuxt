
import os
import subprocess
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def run_dev_server_and_test(project_dir, timeout=60):
    # 启动开发服务器
    server_process = subprocess.Popen(
        "pnpm run dev",
        shell=True,
        cwd=project_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    try:
        # 等待服务器启动
        time.sleep(10)

        # 设置Chrome选项
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")

        # 启动浏览器
        driver = webdriver.Chrome(options=chrome_options)

        try:
            # 访问页面
            driver.get('http://localhost:3000')
            
            # 等待页面加载
            WebDriverWait(driver, timeout).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            # 获取页面标题
            title = driver.title
            print(f"页面标题: {title}")

            # 获取页面源代码
            page_source = driver.page_source
            print(f"页面源代码 (前500字符):\n{page_source[:500]}")

            # 执行JavaScript来获取更多信息
            js_info = driver.execute_script("""
                return {
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    screenSize: {
                        width: window.screen.width,
                        height: window.screen.height
                    }
                }
            """)
            print("JavaScript信息:", js_info)

        finally:
            # 关闭浏览器
            driver.quit()

    finally:
        # 终止开发服务器
        server_process.terminate()
        stdout, stderr = server_process.communicate()
        
        print("开发服务器输出:")
        print(stdout)
        print("开发服务器错误:")
        print(stderr)

if __name__ == "__main__":
    project_dir = "/Users/clayzhang/Code/nimship-admin-nuxt"
    run_dev_server_and_test(project_dir)
