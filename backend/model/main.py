from dotenv import load_dotenv
import os
import bs4
from langchain import hub
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever
import argparse

load_dotenv()

# parser 설정
parser = argparse.ArgumentParser()
parser.add_argument("--studyroom", action="store_true")
parser.add_argument("--food", action="store_true")
parser.add_argument("--review", action="store_true")
parser.add_argument("--schedule1", action="store_true")
parser.add_argument("--schedule2", action="store_true")
parser.add_argument("--more_information", action="store_true")
parser.add_argument("--test", action="store_true")

args = parser.parse_args()

# 수강편람 pdf 파일로드
if args.schedule1:
    loader = PyPDFLoader("data/2024-2 수강편람_240905.pdf")

elif args.food:
    loader = CSVLoader(file_path="data/data1_학식정보.csv", encoding='utf-8')

elif args.review:
    loader = CSVLoader(file_path="data/data_에타강의평.csv", encoding='utf-8')

elif args.studyroom:
    loader = CSVLoader(file_path="data/data1_스터디룸정보.csv", encoding='utf-8')

elif args.schedule2:
    loader = CSVLoader(file_path="data/강의시간표(2학기).csv", encoding='utf-8')

elif args.more_information:
    # url = "https://namu.wiki/w/%EC%84%B8%EC%A2%85%EB%8C%80%ED%95%99%EA%B5%90"
    url = "https://namu.wiki/w/%EC%84%B8%EC%A2%85%EB%8C%80%ED%95%99%EA%B5%90/%ED%95%99%EC%8B%9D" #학식
    loader = WebBaseLoader(
        web_paths=(url,),
        bs_kwargs=dict(
            parse_only=bs4.SoupStrainer(
                "div",
                attrs={"class": ["kpi2EFND"]},
            )
        ),
    )

elif args.test:
    docs = []
    url = "https://namu.wiki/w/%EC%84%B8%EC%A2%85%EB%8C%80%ED%95%99%EA%B5%90/%ED%95%99%EC%8B%9D" #학식 나무위키
    loader = WebBaseLoader(
        web_paths=(url,),
        bs_kwargs=dict(
            parse_only=bs4.SoupStrainer(
                "div",
                attrs={"class": ["X+4py3ae NZOrPLdr"]},
            )
        ),
    )
    docs+=loader.load()
    
    url = "https://namu.wiki/w/%EC%84%B8%EC%A2%85%EB%8C%80%ED%95%99%EA%B5%90" #세종대 나무위키
    loader = WebBaseLoader(
        web_paths=(url,),
        bs_kwargs=dict(
            parse_only=bs4.SoupStrainer(
                "div",
                attrs={"class": ["X+4py3ae NZOrPLdr"]},
            )
        ),
    )
    docs+=loader.load()

    loader = CSVLoader(file_path="data/강의시간표(2학기).csv", encoding='utf-8')
    docs+=loader.load()
    
    loader = CSVLoader(file_path="data/data_에타강의평.csv", encoding='utf-8')
    docs+=loader.load()

    loader = CSVLoader(file_path="data/data1_학식정보.csv", encoding='utf-8')
    docs+=loader.load()

    loader = CSVLoader(file_path="data/data1_스터디룸정보.csv", encoding='utf-8')
    docs+=loader.load()

    loader = PyPDFLoader("data/2024-2 수강편람_240905.pdf")
    docs+=loader.load()




# 페이지 별 문서 로드
# docs = loader.load()
print(f"문서의 수: {len(docs)}")
# print(docs[1])

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)

# split_docs = loader.load_and_split(text_splitter=text_splitter)
split_docs = text_splitter.split_documents(docs)

# 벡터스토어를 생성합니다.
vectorstore = FAISS.from_documents(documents=split_docs, embedding=OpenAIEmbeddings())


# 유사도 높은 K 개의 문서를 검색합니다.
k = 10

bm25_retriever = BM25Retriever.from_documents(split_docs)
bm25_retriever.k = k

faiss_vectorstore = FAISS.from_documents(split_docs, OpenAIEmbeddings())
faiss_retriever = faiss_vectorstore.as_retriever(search_kwargs={"k": k})

# initialize the ensemble retriever
ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, faiss_retriever], weights=[0.5, 0.5]
)

# 프롬프트를 생성
prompt = hub.pull("rlm/rag-prompt")

# 모델(LLM) 을 생성
# llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
llm = ChatOpenAI(model_name="gpt-4o", temperature=0)

def format_docs(docs):
    # 검색한 문서 결과를 하나의 문단으로 합쳐줍니다.
    return "\n\n".join(doc.page_content for doc in docs)


rag_chain = (
    {"context": ensemble_retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

print("[Connection Succeeded]")
while True:

    question = input()
    response = rag_chain.invoke(question)

    if question == "quit":
        break

    # print("\n")
    # print("===" * 20)
    # print(f"[HUMAN ASK]\n{question}\n")
    print(f"ANSWER::{response}\n")



# python final.py --review
# python final.py --studyroom
# python final.py --food
# python final.py --schedule2
# python final.py --schedule1
# python final.py --more_information

# 이거 쓰면 됑
# python final.py --test

