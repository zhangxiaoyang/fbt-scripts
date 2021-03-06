#!/usr/bin/env bash
ENV="../env"


if [ ! -d "$ENV" ]
then
    virtualenv "$ENV" --system-site-packages
    source "$ENV"/bin/activate
    echo "argparse==1.2.1
astroid==1.3.4
clonedigger==1.1.0
coverage==4.0a5
distribute==0.6.24
logilab-common==0.63.2
nose==1.3.4
pyflakes==0.8.1
pylint==1.4.1
six==1.9.0
wsgiref==0.1.2" > .req.txt
    pip install -r .req.txt
    rm -rf .req.txt
else
    source "$ENV"/bin/activate
fi


cd fbt_server_py/


echo "== Code metrics ..."
sloccount --duplicates --wide --details . > sloccount.sc || :


echo "== Coverage ..."
find . | grep ".py$"| xargs coverage run
coverage xml --omit=/usr/local/lib/*,/usr/share/*

echo "== Pylint ..."
rm -rf pylint.log
for f in `find . | grep -v "test" | grep ".py$"`
do
    pylint --output-format=parseable --reports=y "$f" >> pylint.log
done || :


echo "== Pyflakes ..."
find . | grep -v "test" | grep ".py$" | xargs pyflakes > pyflakes.log || :


echo "== Clonedigger ..."
find . | grep -v "test" | grep ".py$" | xargs clonedigger --cpd-output || :


echo "== Tests ..."
python run_all_tests.py || :

echo "== Files no tests"
egrep "[^\" ]+\.py" -o coverage.xml | sort |uniq > diff1.txt 
find . -name "*.py" | grep -v "test" | egrep -o "[a-zA-Z0-9_\-]+.py" > diff2.txt
diff diff1.txt diff2.txt | grep ">" | awk '{print $2}'
