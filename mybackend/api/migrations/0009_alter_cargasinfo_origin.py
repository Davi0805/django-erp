# Generated by Django 5.0.6 on 2024-06-21 11:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_cargasinfo_origin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cargasinfo',
            name='origin',
            field=models.ForeignKey(default=46, on_delete=django.db.models.deletion.CASCADE, to='api.country'),
        ),
    ]
