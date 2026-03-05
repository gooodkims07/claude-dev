Attribute VB_Name = "DBUtil"
Public gConn As ADODB.Connection

Public Function OpenConnection() As Boolean
    On Error GoTo ErrorHandler

    Set gConn = New ADODB.Connection
    gConn.ConnectionString = "Provider=OraOLEDB.Oracle;Data Source=ORCL;User ID=scott;Password=tiger;"
    gConn.Open

    OpenConnection = True
    Exit Function

ErrorHandler:
    MsgBox "데이터베이스 연결 실패: " & Err.Description, vbCritical
    OpenConnection = False
End Function

Public Sub CloseConnection()
    If Not gConn Is Nothing Then
        If gConn.State = adStateOpen Then
            gConn.Close
        End If
        Set gConn = Nothing
    End If
End Sub

Public Function ExecuteQuery(sql As String) As ADODB.Recordset
    Dim rs As ADODB.Recordset

    Set rs = New ADODB.Recordset
    rs.CursorLocation = adUseClient
    rs.Open sql, gConn, adOpenStatic, adLockReadOnly

    Set ExecuteQuery = rs
End Function

Public Sub ExecuteNonQuery(sql As String)
    gConn.Execute sql
End Sub

Public Function ExecuteScalar(sql As String) As Variant
    Dim rs As ADODB.Recordset

    Set rs = ExecuteQuery(sql)

    If Not rs.EOF Then
        ExecuteScalar = rs.Fields(0).Value
    Else
        ExecuteScalar = Null
    End If

    rs.Close
    Set rs = Nothing
End Function

Public Sub ExecuteProcedure(procName As String, ParamArray params())
    Dim cmd As ADODB.Command
    Dim i As Integer

    Set cmd = New ADODB.Command
    With cmd
        .ActiveConnection = gConn
        .CommandType = adCmdStoredProc
        .CommandText = procName

        For i = LBound(params) To UBound(params) Step 2
            .Parameters.Append .CreateParameter(params(i), adVarChar, adParamInput, 100, params(i + 1))
        Next i

        .Execute
    End With
End Sub

Public Function GetUserCount(deptCode As String, Optional includeInactive As Boolean = False) As Long
    Dim sql As String
    Dim condition As String

    sql = "SELECT COUNT(*) FROM T_USER WHERE DEPT_CODE = '" & deptCode & "'"

    If Not includeInactive Then
        sql = sql & " AND USE_YN = 'Y'"
    End If

    GetUserCount = ExecuteScalar(sql)
End Function
