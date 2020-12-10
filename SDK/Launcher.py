import erajs.api as a
a.init()
print('CFG:', a.cfg())
print('DAT:', a.dat())
print('SAV:', a.sav())
print('TMP:', a.tmp())
a.t('test', True, style={'color': '#f00'})
a.t('test', style={'color': '#f00'})
