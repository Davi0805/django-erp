from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows
from django.core.files.base import ContentFile
from api.models import CargasInfo
from io import BytesIO
from django.http import HttpResponse
from django.utils.timezone import make_naive
from datetime import datetime
import pytz
import pandas as pd
import xlwt
from api.models import CargasInfo

def download_excel_data(request):
	# content-type of response
	response = HttpResponse(content_type='application/ms-excel')	#decide file name
	response['Content-Disposition'] = 'attachment; filename="Cargas.xls"'	#creating workbook
	wb = xlwt.Workbook(encoding='utf-8')	#adding sheet
	ws = wb.add_sheet("sheet1")	# Sheet header, first row
	row_num = 0	
	font_style = xlwt.XFStyle()
	# headers are bold
	font_style.font.bold = True	#column header names, you can use your own headers here
	columns = ['Column 1', 'Column 2', 'Column 3', 'Column 4', ]	#write column headers in sheet
	for col_num in range(len(columns)):
		ws.write(row_num, col_num, columns[col_num], font_style)	# Sheet body, remaining rows
	font_style = xlwt.XFStyle()	#get your data, from database or from a text file...
	data = CargasInfo.objects.all() #dummy method to fetch data.
	for row_num, my_row in enumerate(data):
		row = [my_row.contractorname.name, my_row.contractorstring, my_row.shipping_status, 
			   my_row.type_of_load, str(my_row.origin.name), str(my_row.destination.name), my_row.destination.name, my_row.weight, 
			   my_row.cost, my_row.ce_mercante]
		for col_num, cell_value in enumerate(row):
			ws.write(row_num + 1, col_num, cell_value, font_style)
	wb.save(response)
	return response


""" from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows
from django.core.files.base import ContentFile
from api.models import CargasInfo
from io import BytesIO
from django.http import HttpResponse
from django.utils.timezone import make_naive
from datetime import datetime
import pytz
import pandas as pd
import xlwt
from api.models import CargasInfo

def download_excel_data(request):
	# content-type of response
	response = HttpResponse(content_type='application/ms-excel')	#decide file name
	response['Content-Disposition'] = 'attachment; filename="ThePythonDjango.xls"'	#creating workbook
	wb = xlwt.Workbook(encoding='utf-8')	#adding sheet
	ws = wb.add_sheet("sheet1")	# Sheet header, first row
	row_num = 0	
	font_style = xlwt.XFStyle()
	# headers are bold
	font_style.font.bold = True	#column header names, you can use your own headers here
	columns = ['Column 1', 'Column 2', 'Column 3', 'Column 4', ]	#write column headers in sheet
	for col_num in range(len(columns)):
		ws.write(row_num, col_num, columns[col_num], font_style)	# Sheet body, remaining rows
	font_style = xlwt.XFStyle()	#get your data, from database or from a text file...
	data = CargasInfo.objects.all() #dummy method to fetch data.
	for my_row in data:
		row_num = row_num + 1
		ws.write(row_num, 0, my_row.contractorname.name, font_style)
		ws.write(row_num, 1, my_row.contractorstring, font_style)
		ws.write(row_num, 2, my_row.shipping_status, font_style)
		ws.write(row_num, 3, my_row.type_of_load, font_style)	
		ws.write(row_num, 4, my_row.origin.name, font_style)
		ws.write(row_num, 5, my_row.destination.name, font_style)
		ws.write(row_num, 6, my_row.weight, font_style)
		ws.write(row_num, 7, my_row.cost, font_style)
		ws.write(row_num, 9, my_row.ce_mercante, font_style)
		wb.save(response)
	return response """