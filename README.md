# PAXERS

Is web app for runners and event makers

## Quick Start

### add a "config.env" file in to config folder in the root

```js
CLIENT_URL = http://localhost:3000
MONGO_URI='<your_mongoDB_Atlas_uri_with_credentials>'
SECRET_KEY = "mysecret"
GOOGLE_EMAIL="<your_google_mail>@gmail.com"
GOOGLE_EMAIL_PASS='<your_google_account_password>'

#this will be configure soon stores in Event "paymentExpiresIn" Model
#this example represents one day
REGISTRATION_EXPIRATION=2
```

### add a ".env" file in to client/src folder

```js
REACT_APP_GOOGLE_CLIENT_ID='<your_google_client_id>'
REACT_APP_BRAND_NAME='Paxers'
REACT_APP_DRAWER_WIDTH=240
REACT_APP_CLIENT_URL='http://localhost:3000'
#used for storing photos
REACT_APP_API_BASE_URL='<your_cloudinary_api_base_url>'

#create a two upload present in your cloudinary account one for receipt and the other for profiles make sure to make it unsigned so that everybody can upload
REACT_APP_UPLOAD_PRESENT_RECEIPTS='<upload_present _for_receipt>'
REACT_APP_UPLOAD_PRESENT_PROFILE='<upload_present _for_profiles>'
```

### Install client dependencies

```bash
npm run client-install
```

### Install server dependencies

```bash
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```

### Test production before deploy

After running a build in the client 👆, cd into the root of the project.
And run...

Linux/Unix

```bash
NODE_ENV=production node server.js
```

Windows Powershell

```bash
$env:NODE_ENV="production"
node server.js
```

Windows CMD Prompt

```bash
set NODE_ENV="production"
node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)

## Goals for this project

I have 2 main goals in making this project

1. To showcase this as my experience for fullstack web development to the organization I am want to be part with.

2. To get this out to the market

## Road Map

I divided the project into TWO audience

1.  For Runners
2.  For Organizers

### For Runners (40% done)

1.  Changing UI (for I suck and don't have the eye in designing. So I decided to buy a ready made theme and customize it as much as possible with my needs) or maybe I'll hire someone to have ui/ux design for me
2.  I will implement the notification function in AZURE (signalR) and with EVENT GRID (But don't have credit card yet which they require in making my account). In advance I just studied the modules for it.
3.  Authenticating and syncing activities data with [STRAVA](https://www.strava.com/).
4.  Having a calendar for activities
5.  Standardize Error handling

### For Organizers (0% done)

1.  I'll figure out soon what would be the MVP for them

## My pursuit as a Web developer

I already love programming with C arduino and C# during my college days but I was held up by what others say to me like "it's to hard for you to do it and so on..." and because of it my fear grows to not do so. But luckily I got out from nay sayers possibly by changing my mindset through reading a tons of books and listening to few motivators out there. And when pandemic happens I had the opportunity and the time to do it.

I decided to build a project that is a problem-solving and that really matters to me and to the world rather than building small application that don't really matter or solve a problem. As you can see this is my first repository in GITHUB.

I am a runner, an elite runner, and I saw a pain-point to my field where organizers want to make an event (e.g. virtual race) where data are log manually, meaning by hand/through excel.
And through this website they can manage and fully automate the work of logging and validating runners' activities by syncing there data through the most popular app called [STRAVA](https://www.strava.com/).

I love this kind of work. I enjoyed doing this - coding for more than 12 hours a day is a no problem to me. For I am passionate with it I am sure I'll excel in this field.

## Acknowledgment

For a little knowledge about web development I struggled a lot understanding
in the start of this project but as I got the hang of it through the power of repetition, I realize it was fun.

Special thanks to all the gurus out there for making me knowledgeable about this field especially to [Traversy Media](https://www.youtube.com/c/TraversyMedia/featured) (I do really get a lot from him) and to my family and girlfriend who are very understanding and supportive to what I do.

# Especial thanks to you for reading all of this. God speed
