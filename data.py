import time
from bs4 import BeautifulSoup
import json
from selenium.webdriver import ActionChains, Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait


class GetSong:
    def __init__(self):
        self.res = []
        self.driver = webdriver.Chrome()

    def webdriver_launch(self):
        # base_url = "https://open.spotify.com/playlist/37i9dQZF1DX4JAvHpjipBk"
        base_url = "https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT"
        self.driver.get(base_url)
        self.driver.maximize_window()

        WebDriverWait(self.driver, 30).until(EC.presence_of_element_located((By.XPATH, "//div[@class='JUa6JJNj7R_Y3i4P8YUX']")))
        self.driver.implicitly_wait(60)

    def get_data(self):
        page_html = self.driver.page_source
        soup = BeautifulSoup(page_html, "html.parser")
        containers = soup.find("div", attrs={"class": "JUa6JJNj7R_Y3i4P8YUX"}).find_all("div", attrs={"role": "presentation"})
        # print(containers[2])
        self.songs = containers[2].find_all('div', attrs={"aria-selected": "false", "role": "row"})
        # print(self.songs)

        for song in self.songs:
            self.data = {
                "number": song.findNext('span', attrs={"class": "Type__TypeElement-sc-goli3j-0 eRYMpa VrRwdIZO0sRX1lsWxJBe"}).text,
                "image": song.find('img')['src'],
                "title": song.find('a').text,
                "artist": song.find('span', attrs={"class": "Type__TypeElement-sc-goli3j-0 dvSMET rq2VQ5mb9SDAFWbBIUIn standalone-ellipsis-one-line"}).text,
                "album": song.find_all_next('div', attrs={"class": "bfQ2S9bMXr_kJjqEfcwA"})[0].text,
                "duration": song.findNext('div', attrs={
                    "class": "Type__TypeElement-sc-goli3j-0 dvSMET Btg2qHSuepFGBG6X0yEN"}).text,
            }
            # print(self.data)
            if self.data not in self.res:
                self.res.append(self.data)

    def scroll(self):
        action = ActionChains(self.driver)
        time.sleep(5)
        action.send_keys(Keys.PAGE_DOWN)
        action.perform()

    def run(self):
        self.webdriver_launch()
        self.get_data()
        for x in range(7):
            self.scroll()
        self.get_data()
        for y in range(7):
            self.scroll()
        self.get_data()
        for z in range(7):
            self.scroll()
        self.get_data()
        with open('song.json', 'w') as f:
            json.dump(self.res, f, indent=8, ensure_ascii=False)


if __name__ == "__main__":
    c = GetSong()
    c.run()


