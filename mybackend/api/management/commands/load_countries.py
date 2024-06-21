import openpyxl
from django.core.management.base import BaseCommand
from api.models import Country

class Command(BaseCommand):
    def handle(self, *args, **options):
        # Load the Excel file
        wb = openpyxl.load_workbook('iso_countrycodes.xlsx')
        sheet = wb.active

        # Iterate over the rows in the Excel file
        for row in sheet.iter_rows(min_row=4, values_only=True):
            # Create a new Country instance
            country = Country(name=row[1], iso_code=row[0])
            country.save()

        self.stdout.write(self.style.SUCCESS('Countries loaded successfully!'))