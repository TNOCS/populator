from sqlalchemy import create_engine
import pandas
import time

# create timer
start_time = time.time()
engine = create_engine(
    "postgresql://postgis:Geheim1!@localhost:5432/BAG",
    execution_options={
        "isolation_level": "REPEATABLE READ"
    }
)

pop = pandas.read_csv('population.csv')
print('pop data read')
print('starting pop data stream to database')
pop.to_sql('population', engine, if_exists='replace', index=False)


# see total time to do insert
print("%s seconds ---" % (time.time() - start_time))