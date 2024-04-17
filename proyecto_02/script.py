import csv
import random
import datetime
import string

# Función para generar un ID único
def generate_id(prefix):
    return f"{prefix}_{''.join(random.choices(string.ascii_uppercase + string.digits, k=10))}"

# Generar datos para 5000 nodos
tweets = []
users = []
links = []
locations = []
hashtags = []

for i in range(5000):
    # Generar datos para Tweets
    tweet_date = datetime.date(random.randint(2020, 2023), random.randint(1, 12), random.randint(1, 28))
    tweet_text = f"Tweet {i+1}"
    tweet_hashtags = [generate_id("hashtag") for _ in range(random.randint(1, 5))]
    tweet_links = [generate_id("link") for _ in range(random.randint(1, 3))]
    tweet_id = generate_id("tweet")
    tweet_topic = random.choice(["politics", "technology", "sports", "entertainment"])
    tweet_mentions = [generate_id("user") for _ in range(random.randint(1, 3))]
    tweet_location = generate_id("location")
    tweets.append({
        "fecha": tweet_date,
        "texto": tweet_text,
        "hashtags": tweet_hashtags,
        "links": tweet_links,
        "id": tweet_id,
        "topic": tweet_topic,
        "mentions": tweet_mentions,
        "ubicacion": tweet_location
    })

    # Generar datos para Users
    user_username = f"user{i+1}"
    user_password = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    user_id = generate_id("user")
    user_verified = random.choice([True, False])
    user_email = f"{user_username}@example.com"
    user_dob = datetime.date(random.randint(1980, 2000), random.randint(1, 12), random.randint(1, 28))
    user_real_name = f"User {i+1}"
    users.append({
        "username": user_username,
        "password": user_password,
        "id": user_id,
        "verificado": user_verified,
        "mail": user_email,
        "date_of_birth": user_dob,
        "real_name": user_real_name
    })

    # Generar datos para Links
    link_url = f"https://example.com/link{i+1}"
    link_https = random.choice([True, False])
    link_extension = random.choice([".com", ".org", ".net", ".io"])
    link_topic = random.choice(["politics", "technology", "sports", "entertainment"])
    link_id = generate_id("link")
    links.append({
        "url": link_url,
        "https": link_https,
        "terminacion": link_extension,
        "topic": link_topic,
        "id": link_id
    })

    # Generar datos para Ubicaciones
    location_country = random.choice(["USA", "Canada", "Mexico", "UK", "Germany", "France"])
    location_coords = [random.uniform(-180, 180), random.uniform(-90, 90)]
    location_region = random.choice(["California", "Ontario", "Baja California", "London", "Bavaria", "Île-de-France"])
    location_urban = random.choice([True, False])
    location_id = generate_id("location")
    locations.append({
        "pais": location_country,
        "coords": location_coords,
        "region": location_region,
        "urban": location_urban,
        "id": location_id
    })

    # Generar datos para Hashtags
    hashtag_name = f"#{generate_id('hashtag')}"
    hashtag_size = random.choice(["small", "medium", "large"])
    hashtag_topic = random.choice(["politics", "technology", "sports", "entertainment"])
    hashtag_trending = random.choice([True, False])
    hashtag_id = generate_id("hashtag")
    hashtags.append({
        "name": hashtag_name,
        "size": hashtag_size,
        "topic": hashtag_topic,
        "trending": hashtag_trending,
        "id": hashtag_id
    })

# Escribir los datos en archivos CSV
with open('tweets.csv', 'w', newline='') as csvfile:
    fieldnames = ['fecha', 'texto', 'hashtags', 'links', 'id', 'topic', 'mentions', 'ubicacion']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for tweet in tweets:
        writer.writerow(tweet)

with open('users.csv', 'w', newline='') as csvfile:
    fieldnames = ['username', 'password', 'id', 'verificado', 'mail', 'date_of_birth', 'real_name']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for user in users:
        writer.writerow(user)

with open('links.csv', 'w', newline='') as csvfile:
    fieldnames = ['url', 'https', 'terminacion', 'topic', 'id']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for link in links:
        writer.writerow(link)

with open('locations.csv', 'w', newline='') as csvfile:
    fieldnames = ['pais', 'coords', 'region', 'urban', 'id']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for location in locations:
        writer.writerow(location)

with open('hashtags.csv', 'w', newline='') as csvfile:
    fieldnames = ['name', 'size', 'topic', 'trending', 'id']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for hashtag in hashtags:
        writer.writerow(hashtag)

print("Los archivos CSV se han generado correctamente.")