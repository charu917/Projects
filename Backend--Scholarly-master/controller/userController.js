const express = require("express");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");
// add a user to database
module.exports.addUser = async (req, res) => {
  try {
    let data = req.body;
    let users = this.findUsers(data.email, data.password);
    if (users.length > 0) res.json({ status: "already exists" });
    let sign_up = await user.create({
      name: {
        first: data.firstName,
        last: data.lastName,
      },
      email: data.email,
      password: data.password,
      percentage10th: data.percentage10th,
      percentage12th: data.percentage12th,
      percentageUg: data.percentageUg,
      ugDegree: data.ugDegree,
      intendedDegree: data.intendedDegree,
      Scholarships: [],
    });
    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
  }
};
//sign in, send a jwt token to client
module.exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await this.findUsers(email, password);
    if (users.length == 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      { userId: users[0]._id, username: users[0].username },
      "shhh"
    );
    res.json({ token: token });
  } catch (err) {
    console.log(err);
  }
};
//find a user
module.exports.findUsers = async (username, password) => {
  try {
    let user_details = await user.find({
      email: username,
      password: password,
    });
    return user_details;
  } catch (err) {
    console.log(err);
  }
};
module.exports.userInfo = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      const user_data = jwt.verify(token, "shhh");
      let id = user_data.userId;
      let data_sent = await user.findOne({ _id: id });
      res.json({
        status: true,
        data: data_sent,
      });
    } else {
      res.json({
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.updateuserInfo = async (req, res) => {
  try {
    let data = req.body;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      const user_data = jwt.verify(token, "shhh");
      let id = user_data.userId;
      let data_sent = await user.updateOne(
        { _id: id },
        {
          $set: {
            name: {
              first: data.firstName,
              last: data.lastName,
            },
            password: data.password,
            email: data.email,
            percentage10th: data.percentage10th,
            percentage12th: data.percentage12th,
            ugDegree: data.ugDegree,
            percentageUg: data.percentageUg,
            intendedDegree: data.intendedDegree,
          },
        }
      );
      res.json({
        status: true,
        data: data_sent,
      });
    } else {
      res.json({
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function scrapeData(url) {
  try {
    const html = await fetchHTML(url);
    if (!html) return;
    let data = [];
    const $ = cheerio.load(html);
    //send an object from here containing different fields in the scholarship
    $(".right").each((index, element) => {
      let list_links = [];
      $(element)
        .find(".skills li")
        .each((index, el) => {
          list_links.push($(el).text());
        });
      let curr_obj = {
        heading: "",
        heading_link: "",
        links: list_links,
        content: "",
      };
      curr_obj.heading = $(element).find("h3").text();
      curr_obj.content = $(element).find("p").find("span").text();
      if (!curr_obj.content.trim()) {
        curr_obj.content = $(element).find("p").text();
      }
      data.push(curr_obj);
    });
    let counter = 0;
    $(".resume-item").each((index, element) => {
      let img_url = $(element).find("a").find("img").attr("src");
      data[counter].img_url = img_url;
      counter++;
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function scrapeAllScholarships(baseUrl) {
  try {
    let allScholarships = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage && page < 10) {
      const url = `${baseUrl}&page=${page}`;
      const scholarships = await scrapeData(url);

      if (scholarships && scholarships.length === 0) {
        hasNextPage = false;
      } else {
        allScholarships = allScholarships.concat(scholarships);
        page++;
      }
    }

    return allScholarships;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

module.exports.scholarshipsData = async (request, response) => {
  try {
    let { url } = request.body;
    let resp_data = await scrapeAllScholarships(url);
    response.json(resp_data);
  } catch (err) {
    console.log(err);
  }
};

// individual scholarship
async function scrapeIndividual(url) {
  try {
    let html = await fetchHTML(url);
    if (!html) return;
    let leftData = {
      heading: "",
      imgUrl: "",
      description: "",
      markers: "",
      status: "",
      link: "",
      overview: [],
    };
    const $ = cheerio.load(html);
    let heading = $("h1").text();
    let img_url = $(".company-logo").find("img").attr("src");
    let description = $("div.job-details-body").find("p").text().trim();
    let markers = $(".content").find(".mt-2").text();
    let status = $(".salary-type").find("span.sc-active").text();
    let link = $(".salary-range").find("a.whatsapp-share").attr("href");
    let arr = [];
    let overview = $(".job-overview li").each((index, element) => {
      let data = $(element).text();
      arr.push(data);
    });
    arr.pop();
    let official_link = $(".job-overview").find("li").find("a").attr("href");
    arr.push(`Official Link: ${official_link}`);
    leftData.heading = heading;
    leftData.imgUrl = img_url;
    leftData.description = description;
    leftData.markers = markers;
    leftData.status = status;
    leftData.link = link;
    leftData.overview = arr;
    return leftData;
  } catch (err) {
    console.log(err);
  }
}
module.exports.sendscholarshipData = async (req, res) => {
  try {
    let params = req.body;
    let url = `https://scholarshipforme.com/scholarships/${params.heading}`;
    let data = await scrapeIndividual(url);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports.find_status = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    let { heading } = req.body;
    heading = heading
      .trim()
      .replace(/[^\w\s-]/g, "")
      .toLowerCase()
      .split(" ")
      .join("-");
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      const user_data = jwt.verify(token, "shhh");
      let id = user_data.userId;
      let data_sent = await user.findOne({ _id: id });
      let scholarship = null;
      if (data_sent.Scholarships.length > 0) {
        scholarship = data_sent.Scholarships.find((scholarship) => {
          return scholarship.title == heading;
        });
      }
      let status = { applied: false, saved: false };
      if (scholarship) {
        status = scholarship.status;
      }
      res.json({ status: status });
    } else {
      res.json({
        status: { applied: false, saved: false },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.change_status = async (req, res) => {
  try {
    let header = req.headers["authorization"];
    let data = req.body;
    let token = header && header.split(" ")[1];
    if (token) {
      const user_data = jwt.verify(token, "shhh");
      let id = user_data.userId;
      let data_sent = await user.findOne({ _id: id });
      data.title = data.title
        .trim()
        .replace(/[^\w\s-]/g, "")
        .toLowerCase()
        .split(" ")
        .join("-");
      let existingScholarshipIndex = data_sent.Scholarships.findIndex(
        (scholarship) => scholarship.title === data.title
      );

      if (existingScholarshipIndex !== -1) {
        data_sent.Scholarships[existingScholarshipIndex].status = data.status;
        await data_sent.save();
      } else {
        data_sent.Scholarships.push({
          title: data.title,
          status: data.status,
        });
        await data_sent.save();
      }

      res.json({
        status: "success",
      });
    } else {
      res.json({
        status: "no token",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
//scrape popular scholarships using puppeteer
async function scrapePopularScholarships() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://scholarshipforme.com");

    // Wait for the scholarships to be loaded
    await page.waitForSelector(".single-job");

    // Extract scholarship data
    const scholarships = await page.evaluate(() => {
      const scholarshipsData = [];
      const scholarshipsElements = document.querySelectorAll(".single-job");

      scholarshipsElements.forEach((element) => {
        const title = element
          .querySelector(".job-content h4 a")
          .innerText.trim();
        const status = element.querySelector(".sc-active").innerText.trim();
        const state = element
          .querySelector(".job-content i.lni-map-marker")
          .nextSibling.textContent.trim();

        scholarshipsData.push({ title, status, state });
      });

      return scholarshipsData;
    });

    await browser.close();
    return scholarships;
  } catch (err) {
    console.log(err);
  }
}

//controller function for popular scholarships
module.exports.getPopular = async (req, res) => {
  try {
    let data = await scrapePopularScholarships();
    //send only six
    let main = [];
    let i = 0;
    while (i < 6) {
      main.push(data[i]);
      i += 1;
    }
    res.json(main);
  } catch (err) {
    console.log(err);
  }
};
