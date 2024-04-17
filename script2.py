import os
import csv
from py2neo import Graph, Node, Relationship

# Configuración de la conexión a Neo4j
NEO4J_URI = "neo4j+s://c129e070.databases.neo4j.io"
NEO4J_USERNAME = "neo4j"
NEO4J_PASSWORD = "2hke53i8ss-TGNiwVHdyvqjFUI9gFqwH-F0tG8BF-Oo"

# Crear un objeto Graph
graph = Graph(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))

# Funciones para crear nodos y relaciones
def create_tweet(tx, tweet):
    t = Node("Tweet",
             fecha=tweet["fecha"],
             texto=tweet["texto"],
             hashtags=tweet["hashtags"],
             links=tweet["links"],
             id=tweet["id"],
             topic=tweet["topic"],
             mentions=tweet["mentions"],
             ubicacion=tweet["ubicacion"])
    tx.create(t)
    return t

def create_user(tx, user):
    u = Node("User",
             username=user["username"],
             password=user["password"],
             id=user["id"],
             verificado=user["verificado"],
             mail=user["mail"],
             date_of_birth=user["date_of_birth"],
             real_name=user["real_name"])
    tx.create(u)
    return u

def create_link(tx, link):
    l = Node("Link",
             url=link["url"],
             https=link["https"],
             terminacion=link["terminacion"],
             topic=link["topic"],
             id=link["id"])
    tx.create(l)
    return l

def create_location(tx, location):
    loc = Node("Location",
               pais=location["pais"],
               coords=location["coords"],
               region=location["region"],
               urban=location["urban"],
               id=location["id"])
    tx.create(loc)
    return loc

def create_hashtag(tx, hashtag):
    h = Node("Hashtag",
             name=hashtag["name"],
             size=hashtag["size"],
             topic=hashtag["topic"],
             trending=hashtag["trending"],
             id=hashtag["id"])
    tx.create(h)
    return h

def create_rt(tx, rt):
    t1 = graph.nodes.match("Tweet", id=rt["id"]).first()
    t2 = graph.nodes.match("Tweet", id=rt["id"]).first()
    r = Relationship(t1, "RT", t2, id=rt["id"], fecha=rt["fecha"], motivo=rt["motivo"])
    tx.create(r)
    return r

def create_rt_mention(tx, rt_mention):
    t = graph.nodes.match("Tweet", id=rt_mention["id"]).first()
    u = graph.nodes.match("User", id=rt_mention["mentioned_user"]).first()
    r = Relationship(t, "RT_MENTION", u, id=rt_mention["id"], fecha=rt_mention["fecha"])
    tx.create(r)
    return r

def create_follows(tx, follows):
    u1 = graph.nodes.match("User", id=follows["id"]).first()
    u2 = graph.nodes.match("User", id=follows["num_follow"]).first()
    r = Relationship(u1, "FOLLOWS", u2, id=follows["id"], num_follow=follows["num_follow"], fecha=follows["fecha"])
    tx.create(r)
    return r

def create_mention(tx, mention):
    t = graph.nodes.match("Tweet", id=mention["id"]).first()
    u = graph.nodes.match("User", username=mention["mentioned_username"]).first()
    r = Relationship(t, "MENTION", u, id=mention["id"], fecha=mention["fecha"])
    tx.create(r)
    return r

def create_post(tx, post):
    u = graph.nodes.match("User", id=post["posted_by"]).first()
    t = graph.nodes.match("Tweet", id=post["id"]).first()
    r = Relationship(u, "POST", t, id=post["id"], fecha=post["fecha"])
    tx.create(r)
    return r

def create_se_ubica(tx, se_ubica):
    t = graph.nodes.match("Tweet", id=se_ubica["id"]).first()
    loc = graph.nodes.match("Location", id=se_ubica["id"]).first()
    r = Relationship(t, "SE_UBICA", loc, id=se_ubica["id"], fecha=se_ubica["fecha"], validacion=se_ubica["validacion"])
    tx.create(r)
    return r

def create_contiene(tx, contiene):
    t = graph.nodes.match("Tweet", id=contiene["id"]).first()
    l = graph.nodes.match("Link", id=contiene["id"]).first()
    r = Relationship(t, "CONTIENE", l, id=contiene["id"], fecha=contiene["fecha"], validacion=contiene["validacion"])
    tx.create(r)
    return r

def create_reply(tx, reply):
    t1 = graph.nodes.match("Tweet", id=reply["replied_tweet"]).first()
    t2 = graph.nodes.match("Tweet", id=reply["id"]).first()
    r = Relationship(t2, "REPLY", t1, id=reply["id"], fecha=reply["fecha"])
    tx.create(r)
    return r

def create_like(tx, like):
    u = graph.nodes.match("User", username=like["username_like"]).first()
    t = graph.nodes.match("Tweet", id=like["id"]).first()
    r = Relationship(u, "LIKE", t, id=like["id"], fecha=like["fecha"])
    tx.create(r)
    return r

def create_saved(tx, saved):
    u = graph.nodes.match("User", username=saved["username_saved"]).first()
    t = graph.nodes.match("Tweet", id=saved["id"]).first()
    r = Relationship(u, "SAVED", t, id=saved["id"], fecha=saved["fecha"])
    tx.create(r)
    return r

def create_tag(tx, tag):
    t = graph.nodes.match("Tweet", id=tag["tweet_tagged"]).first()
    h = graph.nodes.match("Hashtag", id=tag["id"]).first()
    r = Relationship(t, "TAG", h, id=tag["id"], fecha=tag["fecha"])
    tx.create(r)
    return r

# Cargar los datos de los archivos CSV
with graph.begin_transaction() as tx:
    # Cargar Tweets
    with open('tweets.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_tweet(tx, row)

    # Cargar Users
    with open('users.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_user(tx, row)

    # Cargar Links
    with open('links.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_link(tx, row)

    # Cargar Ubicaciones
    with open('locations.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_location(tx, row)

    # Cargar Hashtags
    with open('hashtags.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_hashtag(tx, row)

    # Cargar Relaciones
    with open('rt.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_rt(tx, row)

    with open('rt_mention.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_rt_mention(tx, row)

    with open('follows.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_follows(tx, row)

    with open('mention.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_mention(tx, row)

    with open('post.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_post(tx, row)

    with open('se_ubica.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_se_ubica(tx, row)

    with open('contiene.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_contiene(tx, row)

    with open('reply.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_reply(tx, row)

    with open('like.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_like(tx, row)

    with open('saved.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_saved(tx, row)

    with open('tag.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            create_tag(tx, row)

print("Datos cargados en Neo4j correctamente.")